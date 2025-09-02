
import { Section, Question } from './types';

export const INSTRUCTIONS: string[] = [
  "This is a timed test; the running time is displayed on top left corner of the screen.",
  "The bar above the question text displays the question numbers in the current section of the test. You can move to any question by clicking on the respective number.",
  "The question screen displays the question number along with the question and respective options.",
  "The top right of section above the question has an option to mark the question for review. You can later view the marked question.",
  "You can mark or unmark any option you have chosen by tapping on the respective option.",
  "The bottom left corner contains the option to move to the previous question.",
  "The bottom right corner contains the option to move to the next question.",
  "You can jump between sections (if allowed by tutor) by choosing the section in bottom centre drop down.",
  "You can submit the test at any point of time by clicking the Submit button on top right corner of the screen.",
  "Before submission, the screen shows a confirmation pop-up with the total number of questions in the test, questions answered and questions marked for review.",
  "Test must be completed in one attempt. Test once submitted cannot be re-attempted or started again.",
  "You should not change or close the test screen while attempting test.",
  "If the app is closed or screen is changed more than three times by any means, the test will be submitted automatically.",
  "After completion of test, a test summary screen will be displayed with section details & solutions.",
  "If something goes wrong, contact your tutor and communicate the problem."
];

export const SECTIONS: Section[] = [
  { id: 1, title: 'General Awareness', questions: 2, marks: 2 },
  { id: 2, title: 'Quantitative Aptitude', questions: 1, marks: 1 },
  { id: 3, title: 'Numerical, Logical, Analytical Ability & Reasoning', questions: 1, marks: 1 },
  { id: 4, title: 'English Language', questions: 1, marks: 1 },
];

export const TOTAL_QUESTIONS = SECTIONS.reduce((sum, section) => sum + section.questions, 0);
export const TOTAL_MARKS = SECTIONS.reduce((sum, section) => sum + section.marks, 0);
export const TEST_DURATION_MINUTES = 60;


export const QUESTIONS: Question[] = [
  // Section 1: General Awareness
  {
    id: 'GA1',
    sectionId: 1,
    questionText: "The All India Institute of Medical Sciences (AIIMS), Bilaspur, is located in which of the following states?",
    questionTextHindi: "अखिल भारतीय आयुर्विज्ञान संस्थान (एम्स), बिलासपुर, निम्नलिखित में से किस राज्य में स्थित है?",
    options: [
      { id: 1, text: "Gujarat / गुजरात" },
      { id: 2, text: "Uttar Pradesh / उत्तर प्रदेश" },
      { id: 3, text: "Himachal Pradesh / हिमाचल प्रदेश" },
      { id: 4, text: "Telangana / तेलंगाना" },
    ],
    correctOptionId: 3,
    positiveMarks: 1,
    negativeMarks: 0.25,
  },
  {
    id: 'GA2',
    sectionId: 1,
    questionText: "Which planet is known as the Red Planet?",
    questionTextHindi: "किस ग्रह को लाल ग्रह के नाम से जाना जाता है?",
    options: [
        { id: 1, text: "Earth / पृथ्वी" },
        { id: 2, text: "Mars / मंगल" },
        { id: 3, text: "Jupiter / बृहस्पति" },
        { id: 4, text: "Saturn / शनि" },
    ],
    correctOptionId: 2,
    positiveMarks: 1,
    negativeMarks: 0.25,
  },
  // Section 2: Quantitative Aptitude
  {
    id: 'QA1',
    sectionId: 2,
    questionText: "If a train travels at 60 km/h, how far will it travel in 2.5 hours?",
    questionTextHindi: "यदि एक ट्रेन 60 किमी/घंटा की गति से चलती है, तो वह 2.5 घंटे में कितनी दूरी तय करेगी?",
    options: [
      { id: 1, text: "120 km" },
      { id: 2, text: "150 km" },
      { id: 3, text: "180 km" },
      { id: 4, text: "100 km" },
    ],
    correctOptionId: 2,
    positiveMarks: 1,
    negativeMarks: 0.25,
  },
   // Section 3: Reasoning
   {
    id: 'R1',
    sectionId: 3,
    questionText: "Which number should come next in the series: 1, 4, 9, 16, ...?",
    questionTextHindi: "श्रृंखला में अगला नंबर कौन सा होना चाहिए: 1, 4, 9, 16, ...?",
    options: [
      { id: 1, text: "20" },
      { id: 2, text: "25" },
      { id: 3, text: "30" },
      { id: 4, text: "36" },
    ],
    correctOptionId: 2,
    positiveMarks: 1,
    negativeMarks: 0.25,
  },
  // Section 4: English Language
  {
    id: 'E1',
    sectionId: 4,
    questionText: "Choose the synonym for the word 'Happy'.",
    questionTextHindi: "'Happy' शब्द का पर्यायवाची चुनें।",
    options: [
      { id: 1, text: "Sorrowful" },
      { id: 2, text: "Joyful" },
      { id: 3, text: "Angry" },
      { id: 4, text: "Tired" },
    ],
    correctOptionId: 2,
    positiveMarks: 1,
    negativeMarks: 0.25,
  },
];
