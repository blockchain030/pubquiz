import { values } from "mobx";


const getAllAnswersForGrading = async (store) => {
    // console.log(currentQuestion.myAnswer)

    console.log('getAllAnswersForGrading: TODO: get answers from other teams')

    const teams = [
        { name: 'Team 1' , answer: 'Answer one'   },
        { name: 'Team 2' , answer: 'Answer two'   },
        { name: 'Team 3' , answer: 'Answer three' },
        { name: 'Team 4' , answer: 'Answer four'  },
        { name: 'Team 5' , answer: 'Answer five'  },
        { name: 'Team 6' , answer: 'Answer six'   },
        { name: 'Team 7' , answer: 'Answer seven' },
        { name: 'Team 8' , answer: 'Answer eight' },
        { name: 'Team 9' , answer: 'Answer nine'  },
        { name: 'Team 10', answer: 'Answer ten'   },
    ]

    // console.log(store.quiz.currentRound.questions.toJSON())
    for (const question of values(store.quiz.currentRound.questions)) {
        // console.log('question', question.toJSON())
        for (const team of teams) {
            // console.log('team', team)
            question.pushGradedAnswer({
                teamName: team.name,
                teamId: '#ID ' + team.name,
                answer: team.answer,
                grade: 0,
            })
        }
        // console.log(question.gradedAnswers.toJSON())
    }
}

export default getAllAnswersForGrading
