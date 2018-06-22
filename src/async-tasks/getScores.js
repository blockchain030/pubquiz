import delay from 'await-delay'


const getScores = async (store) => {
    await delay(1000)

    // note: get answers for this round only of course

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

    const { teamScores } = store
    teamScores.setAfterRound(store.quiz.roundIndex)
    const teamScoreInfo = []

    for (const team of teams) {
        // console.log('team', team)
        teamScoreInfo.push({
            teamName: team.name,
            teamId: '#ID ' + team.name,
            points: parseInt(Math.random() * 100, 10),
        })
    }

    const teamScoreInfoSorted = teamScoreInfo.slice().sort((a,b) => b.points - a.points)
    
    teamScores.setTeamScoreInfo(teamScoreInfoSorted)
}

export default getScores
