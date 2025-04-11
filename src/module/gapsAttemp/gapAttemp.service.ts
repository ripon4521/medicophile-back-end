import GapAttempModel from "./gapAttemp.model";

const getAllGapAttemp = async () => {
  const result = await GapAttempModel.find({ isDeleted: false });
  return result;
};

const getSpecificUserGapsAttempMark = async (
  studentId: string,
  examId: string,
) => {
  const result = await GapAttempModel.find({
    studentId,
    examId,
    isDeleted: false,
  });

  // Check what data you're getting
  console.log("Result:", result);

  const totalScore = result.reduce((sum, attempt) => {
    return (
      sum +
      (typeof attempt.score === "number"
        ? attempt.score
        : parseFloat(attempt.score || "0"))
    );
  }, 0);

  console.log("Total Score:", totalScore);

  return {
    totalScore,
  };
};

export const gapAttempService = {
  getAllGapAttemp,
  getSpecificUserGapsAttempMark,
};
