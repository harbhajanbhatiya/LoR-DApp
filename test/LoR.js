const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoR Smart Contract", function () {

    let lor;
    let owner;
    let student;
    let faculty;
    let unauthorizedUser;

    beforeEach(async function () {

        [owner, student, faculty, unauthorizedUser] =
            await ethers.getSigners();

        const LoR = await ethers.getContractFactory("LoR");

        lor = await LoR.deploy();

        await lor.waitForDeployment();
    });

    // TEST 1: Contract deployment
    it("Should assign the deployer as owner", async function () {

        expect(await lor.owner()).to.equal(owner.address);

    });

    // TEST 2: Add student
    it("Should allow owner to add a student", async function () {

        await lor.addStudent(
            "Badal",
            "Artificial Intelligence",
            "badal@example.com"
        );

        const studentData = await lor.getStudent(1);

        expect(studentData.name).to.equal("Badal");
        expect(studentData.course).to.equal("Artificial Intelligence");
        expect(studentData.email).to.equal("badal@example.com");

    });

    // TEST 3: Unauthorized student addition
    it("Should prevent non-owner from adding students", async function () {

        await expect(
            lor.connect(student).addStudent(
                "Rahul",
                "Computer Science",
                "rahul@example.com"
            )
        ).to.be.revertedWith("Only owner can perform this action");

    });

    // TEST 4: Request recommendation
    it("Should allow a user to request a recommendation", async function () {

        await lor.addStudent(
            "Badal",
            "AI & DS",
            "badal@example.com"
        );

        await lor.connect(student).requestRecommendation(1);

        const studentData = await lor.getStudent(1);

        expect(studentData.recommendationRequested).to.equal(true);
        expect(studentData.requester).to.equal(student.address);

    });

    // TEST 5: Authorize faculty
    it("Should allow owner to authorize faculty", async function () {

        await lor.authorizeApprover(faculty.address);

        expect(
            await lor.authorizedApprovers(faculty.address)
        ).to.equal(true);

    });

    // TEST 6: Approve recommendation
    it("Should allow authorized faculty to approve recommendation", async function () {

        await lor.addStudent(
            "Badal",
            "AI & DS",
            "badal@example.com"
        );

        await lor.connect(student).requestRecommendation(1);

        await lor.authorizeApprover(faculty.address);

        await lor.connect(faculty).approveRecommendation(1);

        const studentData = await lor.getStudent(1);

        expect(studentData.recommendationApproved).to.equal(true);

    });

    // TEST 7: Unauthorized approval
    it("Should prevent unauthorized users from approving recommendations", async function () {

        await lor.addStudent(
            "Badal",
            "AI & DS",
            "badal@example.com"
        );

        await lor.connect(student).requestRecommendation(1);

        await expect(
            lor.connect(unauthorizedUser).approveRecommendation(1)
        ).to.be.revertedWith("Not an authorized approver");

    });

    // TEST 8: Deauthorize faculty
    it("Should allow owner to deauthorize faculty", async function () {

        await lor.authorizeApprover(faculty.address);

        await lor.deauthorizeApprover(faculty.address);

        expect(
            await lor.authorizedApprovers(faculty.address)
        ).to.equal(false);

    });

    // TEST 9: Prevent duplicate requests
    it("Should prevent duplicate recommendation requests", async function () {

        await lor.addStudent(
            "Badal",
            "AI & DS",
            "badal@example.com"
        );

        await lor.connect(student).requestRecommendation(1);

        await expect(
            lor.connect(student).requestRecommendation(1)
        ).to.be.revertedWith("Recommendation already requested");

    });

});