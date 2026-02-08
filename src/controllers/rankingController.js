const rankingData = [
  { name: "Alice", score: 1500 },
  { name: "Bob", score: 1200 },
  { name: "Charlie", score: 900 },
];

exports.getGlobalRanking = (req, res) => {
  const sortedRanking = [...rankingData].sort((a, b) => b.score - a.score);
  res.json({ status: "success", data: sortedRanking });
};
