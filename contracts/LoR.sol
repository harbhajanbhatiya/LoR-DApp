// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract LoR {

    address public owner;

    uint256 public studentCount;

    struct Student {
        uint256 id;
        string name;
        string course;
        string email;
        address requester;
        bool recommendationRequested;
        bool recommendationApproved;
    }

    mapping(uint256 => Student) private students;

    mapping(address => bool) public authorizedApprovers;

    // Events
    event StudentAdded(
        uint256 indexed studentId,
        string name,
        string course
    );

    event RecommendationRequested(
        uint256 indexed studentId,
        address requester
    );

    event RecommendationApproved(
        uint256 indexed studentId,
        address approver
    );

    event ApproverAuthorized(address approver);

    event ApproverDeauthorized(address approver);

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Owner modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Approver modifier
    modifier onlyApprover() {
        require(
            authorizedApprovers[msg.sender],
            "Not an authorized approver"
        );
        _;
    }

    // Add student
    function addStudent(
        string memory name,
        string memory course,
        string memory email
    ) public onlyOwner {

        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(course).length > 0, "Course cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");

        studentCount++;

        students[studentCount] = Student({
            id: studentCount,
            name: name,
            course: course,
            email: email,
            requester: address(0),
            recommendationRequested: false,
            recommendationApproved: false
        });

        emit StudentAdded(studentCount, name, course);
    }

    // Request recommendation
    function requestRecommendation(uint256 studentId) public {

        require(studentId > 0 && studentId <= studentCount,
            "Student does not exist");

        Student storage student = students[studentId];

        require(
            !student.recommendationRequested,
            "Recommendation already requested"
        );

        student.requester = msg.sender;
        student.recommendationRequested = true;

        emit RecommendationRequested(studentId, msg.sender);
    }

    // Approve recommendation
    function approveRecommendation(
        uint256 studentId
    ) public onlyApprover {

        require(studentId > 0 && studentId <= studentCount,
            "Student does not exist");

        Student storage student = students[studentId];

        require(
            student.recommendationRequested,
            "Recommendation not requested"
        );

        require(
            !student.recommendationApproved,
            "Already approved"
        );

        student.recommendationApproved = true;

        emit RecommendationApproved(studentId, msg.sender);
    }

    // Authorize approver
    function authorizeApprover(
        address approver
    ) public onlyOwner {

        require(approver != address(0), "Invalid address");

        authorizedApprovers[approver] = true;

        emit ApproverAuthorized(approver);
    }

    // Deauthorize approver
    function deauthorizeApprover(
        address approver
    ) public onlyOwner {

        require(
            authorizedApprovers[approver],
            "Address is not an approver"
        );

        authorizedApprovers[approver] = false;

        emit ApproverDeauthorized(approver);
    }

    // Get student details
    function getStudent(
        uint256 studentId
    ) public view returns (
        uint256 id,
        string memory name,
        string memory course,
        string memory email,
        address requester,
        bool recommendationRequested,
        bool recommendationApproved
    ) {

        require(studentId > 0 && studentId <= studentCount,
            "Student does not exist");

        Student memory student = students[studentId];

        return (
            student.id,
            student.name,
            student.course,
            student.email,
            student.requester,
            student.recommendationRequested,
            student.recommendationApproved
        );
    }
}