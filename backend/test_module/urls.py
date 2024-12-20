from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuizViewSet, QuestionViewSet, StartQuizView, 
    QuestionSubmitView, 
    QuizCompleteView, LeaderboardView,
    UserTestsView, SingleTestDetailsView
)

# Initialize the router
router = DefaultRouter()
router.register('quizzes', QuizViewSet)
router.register('questions', QuestionViewSet)

# Define the URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('leaderboard/', LeaderboardView.as_view(), name="leaderboard"),
    path('quizzes/<int:quiz_id>/questions/<int:question_id>/submit/', QuestionSubmitView.as_view(), name='question-submit'),
    path('quizzes/<int:quiz_id>/complete/', QuizCompleteView.as_view(), name='quiz-complete'),
    path('quizzes/<int:quiz_id>/start/', StartQuizView.as_view(), name="start-quiz"),
]

from django.urls import path

urlpatterns += [
    path('tests/', UserTestsView.as_view(), name='user-tests'),
    path('tests/<int:quiz_id>/', SingleTestDetailsView.as_view(), name='single-test-details'),
]
