import earlyDetectionImg from "../assets/images/early-detection.jpeg";
import mythFactImg from "../assets/images/myth-vs-fact.jpeg";
import nutritionImg from "../assets/images/nutrition.jpeg";
import geneticTestingImg from "../assets/images/genetic-testing.jpeg";
import lifeAfterImg from "../assets/images/life-after.jpeg";

const blogData = [
  {
    id: 1,
    title: "Understanding Early Detection",
    imageUrl: earlyDetectionImg,
    readMoreUrl:
      "https://www.nationalbreastcancer.org/early-detection-of-breast-cancer/",
  },
  {
    id: 2,
    title: "Myth vs. Fact",
    imageUrl: mythFactImg,
    readMoreUrl: "https://www.bcrf.org/breast-cancer-myths-and-facts/",
  },
  {
    id: 3,
    title: "Nutrition and Lifestyle",
    imageUrl: nutritionImg,
    readMoreUrl:
      "https://www.aicr.org/cancer-prevention/food-facts/learn-about-breast-cancer/",
  },
  {
    id: 4,
    title: "Genetic Testing",
    imageUrl: geneticTestingImg,
    readMoreUrl:
      "https://www.cancer.org/cancer/types/breast-cancer/risk-and-prevention/genetic-testing-for-breast-cancer.html",
  },
  {
    id: 5,
    title: "Life After Treatment",
    imageUrl: lifeAfterImg,
    readMoreUrl: "https://www.breastcancer.org/treatment/survivorship",
  },
];

export default blogData;
