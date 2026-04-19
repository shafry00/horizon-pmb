-- CreateTable
CREATE TABLE `Consultation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `instagramUsername` VARCHAR(191) NULL,
    `relationshipWithRegistrant` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scholarship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `instagramUsername` VARCHAR(191) NULL,
    `institutionName` VARCHAR(191) NOT NULL,
    `classOrMajor` VARCHAR(191) NOT NULL,
    `birthDate` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `districtOrCity` VARCHAR(191) NOT NULL,
    `subDistrict` VARCHAR(191) NOT NULL,
    `village` VARCHAR(191) NOT NULL,
    `fullAddress` VARCHAR(191) NOT NULL,
    `fatherContact` VARCHAR(191) NOT NULL,
    `motherContact` VARCHAR(191) NOT NULL,
    `studyProgramId` INTEGER NOT NULL,
    `currentStatus` VARCHAR(191) NOT NULL,
    `currentProvince` VARCHAR(191) NOT NULL,
    `totalFamilyMembers` VARCHAR(191) NOT NULL,
    `hasFamilySavings` VARCHAR(191) NOT NULL,
    `houseFloorMaterial` VARCHAR(191) NOT NULL,
    `consumedMeatLastWeek` VARCHAR(191) NOT NULL,
    `consumedFriedRiceLastWeek` VARCHAR(191) NOT NULL,
    `boughtLaundrySuppliesLastMonth` VARCHAR(191) NOT NULL,
    `boughtFuelLastMonth` VARCHAR(191) NOT NULL,
    `hasRefrigerator` VARCHAR(191) NOT NULL,
    `hasCar` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReRegister` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `studyProgramId` INTEGER NOT NULL,
    `institutionName` VARCHAR(191) NOT NULL,
    `scholarshipLetter` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PMB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studyProgramId` INTEGER NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `instagramUsername` VARCHAR(191) NULL,
    `placeOfBirth` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `domicileAddress` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `districtOrCity` VARCHAR(191) NOT NULL,
    `subDistrict` VARCHAR(191) NOT NULL,
    `village` VARCHAR(191) NOT NULL,
    `institutionName` VARCHAR(191) NOT NULL,
    `graduationYear` VARCHAR(191) NOT NULL,
    `maritalStatus` VARCHAR(191) NOT NULL,
    `employmentStatus` VARCHAR(191) NOT NULL,
    `fatherName` VARCHAR(191) NOT NULL,
    `fatherOccupation` VARCHAR(191) NOT NULL,
    `fatherContact` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NOT NULL,
    `motherOccupation` VARCHAR(191) NOT NULL,
    `motherContact` VARCHAR(191) NOT NULL,
    `sourceInfoOfHorizonU` VARCHAR(191) NOT NULL,
    `reasonChooseHorizonU` VARCHAR(191) NOT NULL,
    `ambassadorName` VARCHAR(191) NULL,
    `scholarshipLetter` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudyProgram` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StudyProgram_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `optionA` VARCHAR(191) NOT NULL,
    `optionB` VARCHAR(191) NOT NULL,
    `optionC` VARCHAR(191) NOT NULL,
    `optionD` VARCHAR(191) NOT NULL,
    `optionE` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AssessmentQuestion_question_key`(`question`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pmbId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `selectedOption` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Scholarship` ADD CONSTRAINT `Scholarship_studyProgramId_fkey` FOREIGN KEY (`studyProgramId`) REFERENCES `StudyProgram`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReRegister` ADD CONSTRAINT `ReRegister_studyProgramId_fkey` FOREIGN KEY (`studyProgramId`) REFERENCES `StudyProgram`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PMB` ADD CONSTRAINT `PMB_studyProgramId_fkey` FOREIGN KEY (`studyProgramId`) REFERENCES `StudyProgram`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAnswer` ADD CONSTRAINT `AssessmentAnswer_pmbId_fkey` FOREIGN KEY (`pmbId`) REFERENCES `PMB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAnswer` ADD CONSTRAINT `AssessmentAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `AssessmentQuestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
