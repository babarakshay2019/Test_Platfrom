import random
from django.core.management.base import BaseCommand
from ...models import Quiz, Question

class Command(BaseCommand):
    help = 'Add 20 sample questions to the database with different types'

    def handle(self, *args, **kwargs):
        # Ensure there is a quiz to link the questions to
        quiz, created = Quiz.objects.get_or_create(
            title="Sample Quiz",
            defaults={"description": "A quiz for testing purposes", "passing_score": 70},
        )

        # Define sample questions for each type with dummy answers
        question_data = [
            {
                "question_type": "MCQ",
                "question_text": "What is the capital of France?",
                "options": {"options": ["Paris", "Berlin", "Madrid", "Rome"]},
                "answer": "Paris",  # Dummy answer
            },
            {
                "question_type": "MCQ",
                "question_text": "Which planet is known as the Red Planet?",
                "options": {"options": ["Earth", "Mars", "Jupiter", "Saturn"]},
                "answer": "Mars",  # Dummy answer
            },
            {
                "question_type": "MULTI",
                "question_text": "Select the primary colors.",
                "options": {"options": ["Red", "Blue", "Green", "Yellow"]},
                "answer": "Red, Blue",  # Dummy answer (multi-selection)
            },
            {
                "question_type": "MULTI",
                "question_text": "Which of the following are mammals?",
                "options": {"options": ["Elephant", "Shark", "Frog", "Whale"]},
                "answer": "Elephant, Whale",  # Dummy answer (multi-selection)
            },
            {
                "question_type": "FILL",
                "question_text": "______ is the chemical symbol for water.",
                "options": None,
                "answer": "H2O",  # Dummy answer
            },
            {
                "question_type": "FILL",
                "question_text": "The process by which plants make food is called ______.",
                "options": None,
                "answer": "Photosynthesis",  # Dummy answer
            },
            {
                "question_type": "YN",
                "question_text": "The sun rises in the East.",
                "options": {"options": ["Yes", "No"]},
                "answer": "Yes",  # Dummy answer
            },
            {
                "question_type": "YN",
                "question_text": "Humans can breathe underwater without any aid.",
                "options": {"options": ["Yes", "No"]},
                "answer": "No",  # Dummy answer
            },
        ]

        # Add additional randomized questions with dummy answers
        for i in range(12):
            question_type = random.choice(["MCQ", "MULTI", "FILL", "YN"])
            question_data.append({
                "question_type": question_type,
                "question_text": f"Sample question {i+1} of type {question_type}",
                "options": {"options": ["Option 1", "Option 2", "Option 3", "Option 4"]} if question_type in ["MCQ", "MULTI"] else None,
                "answer": "Option 1" if question_type in ["MCQ", "MULTI"] else "Dummy Answer",  # Dummy answer
            })

        # Create questions in the database
        for data in question_data:
            Question.objects.create(
                quiz=quiz,
                question_type=data["question_type"],
                question_text=data["question_text"],
                options=data["options"],
                answer=data["answer"],
            )

        self.stdout.write(self.style.SUCCESS("20 questions have been added successfully."))
