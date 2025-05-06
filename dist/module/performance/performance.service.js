"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentPerformance = void 0;
const mcqAttemp_model_1 = __importDefault(require("../mcqAttemp/mcqAttemp.model"));
const cqMarking_model_1 = __importDefault(require("../cqMarking/cqMarking.model"));
const gapAttemp_model_1 = __importDefault(require("../gapsAttemp/gapAttemp.model"));
const attendence_model_1 = __importDefault(require("../qrcodeAttendeene/attendence.model"));
// Helper functions to calculate performance metrics
const calculateAccuracy = (mcqs) => {
    const totalCorrect = mcqs.reduce((sum, item) => { var _a; return sum + ((_a = item.correctCount) !== null && _a !== void 0 ? _a : 0); }, 0); // Default to 0 if undefined
    const totalWrong = mcqs.reduce((sum, item) => { var _a; return sum + ((_a = item.wrongCount) !== null && _a !== void 0 ? _a : 0); }, 0); // Default to 0 if undefined
    return (totalCorrect / (totalCorrect + totalWrong)) * 100;
};
const calculateAverageScore = (cqs) => {
    const totalScore = cqs.reduce((sum, item) => sum + item.score, 0);
    return totalScore / cqs.length;
};
const calculateGapPercentage = (gaps) => {
    const totalScore = gaps.reduce((sum, item) => sum + item.score, 0);
    const totalMarks = gaps.reduce((sum, item) => sum + item.totalMarks, 0);
    return (totalScore / totalMarks) * 100;
};
const calculateAttendancePercentage = (attendance) => {
    const totalClasses = attendance.length;
    const attendedClasses = attendance.filter(a => !a.isDeleted).length; // Counting only non-deleted records
    return (attendedClasses / totalClasses) * 100;
};
// Function to generate detailed performance analysis with recommendations
const generatePerformanceReport = (studentData) => {
    const { mcqs, cqs, gaps, attendance } = studentData;
    // MCQ Performance Analysis
    let mcqAnalysis = '';
    let mcqRecommendation = '';
    if (mcqs.accuracy > 80) {
        mcqAnalysis = 'Excellent MCQ performance! You have a strong understanding of the material.';
        mcqRecommendation = 'Continue practicing to maintain your high performance.';
    }
    else if (mcqs.accuracy > 50) {
        mcqAnalysis = 'Good MCQ performance, but room for improvement.';
        mcqRecommendation = 'Focus on reviewing concepts where you lost marks, especially in tricky questions.';
    }
    else {
        mcqAnalysis = 'Needs improvement in MCQs. It seems you are struggling with multiple-choice questions.';
        mcqRecommendation = 'Prioritize practicing more MCQs, especially in weaker areas. Consider timed practice sessions.';
    }
    // CQ Performance Analysis
    let cqAnalysis = '';
    let cqRecommendation = '';
    if (cqs.averageScore > 80) {
        cqAnalysis = 'Outstanding CQ performance! You are performing very well in long-answer questions.';
        cqRecommendation = 'Keep up the great work, but try to focus on refining your writing speed and clarity.';
    }
    else if (cqs.averageScore > 50) {
        cqAnalysis = 'Good CQ performance, but can be improved.';
        cqRecommendation = 'Work on structuring your answers better and managing time effectively during the exam.';
    }
    else {
        cqAnalysis = 'Needs to focus on CQs for better performance.';
        cqRecommendation = 'Consider spending more time on understanding the core concepts and practicing writing long-form answers.';
    }
    // Gap Performance Analysis
    let gapAnalysis = '';
    let gapRecommendation = '';
    if (gaps.percentage > 80) {
        gapAnalysis = 'Excellent Gap performance! Your gap-filling skills are impressive.';
        gapRecommendation = 'Continue working on gap-based questions to keep improving.';
    }
    else if (gaps.percentage > 50) {
        gapAnalysis = 'Decent performance in Gap, but needs improvement.';
        gapRecommendation = 'Review more examples of gap-filling questions and try different difficulty levels.';
    }
    else {
        gapAnalysis = 'Needs to work on Gap performance for better results.';
        gapRecommendation = 'Spend more time practicing gap-filling exercises and reviewing key concepts.';
    }
    // Attendance Performance Analysis
    let attendanceAnalysis = '';
    let attendanceRecommendation = '';
    if (attendance.attendancePercentage > 90) {
        attendanceAnalysis = 'Excellent attendance!';
        attendanceRecommendation = 'Keep up the great work! High attendance helps maintain a strong grasp of the material.';
    }
    else if (attendance.attendancePercentage > 75) {
        attendanceAnalysis = 'Good attendance, but could improve.';
        attendanceRecommendation = 'Try to attend all classes to ensure you do not miss out on important lessons.';
    }
    else {
        attendanceAnalysis = 'Attendance needs to improve significantly.';
        attendanceRecommendation = 'Make sure to attend more classes. Missing classes can negatively impact your overall performance.';
    }
    // Combine all insights into a detailed report
    const performanceReport = `
    Student Performance Report:
    ----------------------------

    MCQ Accuracy: ${mcqs.accuracy}%
    Analysis: ${mcqAnalysis}
    Recommendation: ${mcqRecommendation}

    CQ Average Score: ${cqs.averageScore}
    Analysis: ${cqAnalysis}
    Recommendation: ${cqRecommendation}

    Gap Performance: ${gaps.percentage}%
    Analysis: ${gapAnalysis}
    Recommendation: ${gapRecommendation}

    Attendance: ${attendance.attendancePercentage}%
    Analysis: ${attendanceAnalysis}
    Recommendation: ${attendanceRecommendation}

    Overall Summary:
    ----------------
    The student is showing good progress in certain areas like MCQ accuracy and attendance. Focus on improving in CQs and Gap performance by practicing more targeted exercises. The student is encouraged to maintain consistent attendance to avoid missing crucial lessons.

    Areas for Improvement:
    ----------------------
    - Review difficult MCQs and practice time management.
    - Work on structuring and articulating long-answer responses.
    - Spend additional time on gap-filling exercises.
    - Prioritize attending all classes to ensure consistent learning.

  `;
    return performanceReport;
};
// Main function to get student performance data and generate a report
const getStudentPerformance = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the student's performance data (MCQs, CQs, Gaps, Attendance)
    const [mcqs, cqs, gaps, attendance] = yield Promise.all([
        mcqAttemp_model_1.default.find({ studentId }),
        cqMarking_model_1.default.find({ studentId }),
        gapAttemp_model_1.default.find({ studentId }),
        attendence_model_1.default.find({ studentId, isDeleted: false }), // Ensure `isDeleted` is false
    ]);
    // Helper function to map the raw MCQ data into a proper structure
    const mapToMCQ = (mcqs) => {
        return mcqs.map((mcq) => {
            var _a, _b;
            return ({
                correctCount: (_a = mcq.correctCount) !== null && _a !== void 0 ? _a : 0, // Default to 0 if undefined
                wrongCount: (_b = mcq.wrongCount) !== null && _b !== void 0 ? _b : 0, // Default to 0 if undefined
            });
        });
    };
    // Prepare the student data
    const studentData = {
        mcqs: { accuracy: calculateAccuracy(mapToMCQ(mcqs)) },
        cqs: { averageScore: calculateAverageScore(cqs) },
        gaps: { percentage: calculateGapPercentage(gaps) },
        attendance: { attendancePercentage: calculateAttendancePercentage(attendance) },
    };
    // Generate the detailed performance report
    const performanceReport = generatePerformanceReport(studentData);
    return {
        mcqReport: { accuracy: `${studentData.mcqs.accuracy}%` },
        cqReport: { averageScore: studentData.cqs.averageScore.toFixed(2) },
        gapReport: { percentage: `${studentData.gaps.percentage}%` },
        attendanceReport: { attendancePercentage: `${studentData.attendance.attendancePercentage}%` },
        performanceReport, // Include the detailed performance analysis
    };
});
exports.getStudentPerformance = getStudentPerformance;
