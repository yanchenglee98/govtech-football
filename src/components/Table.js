import { useEffect, useState } from "react";

export default function Table() {
    // for team registration
    const [message, setMessage] = useState('');
    const [teams, setTeams] = useState([]);

    const [groupATeams, setGroupATeams] = useState(new Map());
    const [groupBTeams, setGroupBTeams] = useState(new Map());

    const handleTeamChange = event => {
        setMessage(event.target.value);
    };

    const handleTeamClick = event => {
        event.preventDefault();

        const data = message.split('\n');
        const res = [];
        for (const team of data) {
            const tokens = team.split(' ')
            if (tokens.length !== 3) {
                continue;
            }
            res.push({
                teamName: tokens[0],
                registeredAt: tokens[1],
                groupNo: parseInt(tokens[2])
            })

            if (parseInt(tokens[2]) == 1) {
                setGroupATeams(groupATeams.set(tokens[0], {
                    teamName: tokens[0],
                    registeredAt: tokens[1],
                    groupNo: parseInt(tokens[2])
                }))
            } else {
                setGroupBTeams(groupBTeams.set(tokens[0], {
                    teamName: tokens[0],
                    registeredAt: tokens[1],
                    groupNo: parseInt(tokens[2])
                }))
            }
        }

        setTeams(res);
    }

    const teamRegistrationForm = () => {
        return (      
            <div>
                <h1 className='title has-text-black'>Team Registration</h1>
                <textarea className="textarea" placeholder="e.g. Hello world" onChange={handleTeamChange}></textarea>
                <br></br>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={handleTeamClick} className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    // for result submission
    const [message2, setMessage2] = useState('');
    const [results, setResults] = useState([]);

    const [groupAResults, setGroupAResults] = useState([]);
    const [groupBResults, setGroupBResults] = useState([]);

    const handleResultChange = event => {
        setMessage2(event.target.value);
    };

    const handleResultClick = event => {
        event.preventDefault();

        const data = message2.split('\n');
        const res = [];

        const tempA = []
        const tempB = []
        
        for (const match of data) {
            const toks = match.split(' ')
            if (toks.length !== 4) {
              continue;
            }

            res.push({
              teamOne: toks[0],
              teamTwo: toks[1],
              teamOneGoals: parseInt(toks[2]),
              teamTwoGoals: parseInt(toks[3])
            })
            
            if (groupATeams.get(toks[0]) != undefined) {
                tempA.push({
                    teamOne: toks[0],
                    teamTwo: toks[1],
                    teamOneGoals: parseInt(toks[2]),
                    teamTwoGoals: parseInt(toks[3])
                })
            } else {
                tempB.push({
                    teamOne: toks[0],
                    teamTwo: toks[1],
                    teamOneGoals: parseInt(toks[2]),
                    teamTwoGoals: parseInt(toks[3])
                })
            }
        }        
        setResults(res);
        setGroupAResults(tempA)
        setGroupBResults(tempB)
    }

    const resultSubmissionForm = () => {
        return (      
            <div>
                <h1 className='title has-text-black'>Result Submission</h1>
                <textarea className="textarea" placeholder="e.g. Hello world" onChange={handleResultChange}></textarea>
                <br></br>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={handleResultClick} className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    // table 
    const [tableA, setTableA] = useState([]);
    const [tableB, setTableB] = useState([]);


    const getTableAToRender = () => {
        return tableA.map((team, idx) => {
            return (
                // mt-3 defines margins
                <div className="columns team mt-3 is-vcentered"> 
                    <div className="column has-text-left">
                        <div key={idx}>
                            <div>{team.teamName}, {team.points}, {team.goals} </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const getTableBToRender = () => {
        return tableB.map((team, idx) => {
            return (
                // mt-3 defines margins
                <div className="columns team mt-3 is-vcentered"> 
                    <div className="column has-text-left">
                        <div key={idx}>
                            <div>{team.teamName}, {team.points}, {team.goals} </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleTableClick = () => {
        const resA = generateGroupAResults();
        const resB = generateGroupBResults();

        setTableA(resA.sort(comparator));
        setTableB(resB.sort(comparator));
    }

    const comparator = (a, b) => {
        if (a.points !== b.points) {
            return b.points - a.points;
        }

        if (a.goals !== b.goals) {
            return b.goals - a.goals;
        }

        return 1;
    }

    const resultTable = () => {
        return (
            <div>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={handleTableClick} className="button is-link">Submit</button>
                    </div>
                </div>
                <h1 className='title has-text-black'>Table 1</h1>
                <div>{getTableAToRender()}</div>
                <br></br>
                <h1 className='title has-text-black'>Table 2</h1>
                <div>{getTableBToRender()}</div>
            </div>
        )}

    const generateGroupBResults = () => {
        const mapB = new Map();        
        
        for (const [key, value] of groupBTeams.entries()) {
            mapB.set(key, {teamName: key, points: 0, goals: 0});
        }

        // get results from group B
        groupBResults.forEach((value) => {
            var teamOne = value['teamOne']
            var teamOneGoals = value['teamOneGoals']
            var teamTwo = value['teamTwo']
            var teamTwoGoals = value['teamTwoGoals']

            var pt1 = mapB.get(teamOne)["points"];
            var goals1 = mapB.get(teamOne)["goals"] + teamOneGoals;

            var pt2 = mapB.get(teamTwo)["points"];
            var goals2 = mapB.get(teamOne)["goals"] + teamTwoGoals;
            if (teamOneGoals > teamTwoGoals) {
                // update teamOne
                pt1 += 3;
            } else if (teamOneGoals < teamTwoGoals) {
                // update teamOne
                pt2 += 3;
            } else {
                pt1 += 1;
                pt2 += 1;
            }
            // update teamOne
            mapB.set(teamOne, {teamName: teamOne, points: pt1, goals: goals1});

            // update teamTwo
            mapB.set(teamTwo, {teamName: teamTwo, points: pt2, goals: goals2});
        })
        const values = Array.from(mapB.values());
        return values;
    }

    const generateGroupAResults = () => {
        const mapA = new Map();
        for (const [key, value] of groupATeams.entries()) {
            mapA.set(key, {teamName: key, points: 0, goals: 0});
        }
        // get results from group A
        groupAResults.forEach((value) => {
            var teamOne = value['teamOne']
            var teamOneGoals = value['teamOneGoals']
            var teamTwo = value['teamTwo']
            var teamTwoGoals = value['teamTwoGoals']

            var pt1 = mapA.get(teamOne)["points"];
            var goals1 = mapA.get(teamOne)["goals"] + teamOneGoals;

            var pt2 = mapA.get(teamTwo)["points"];
            var goals2 = mapA.get(teamOne)["goals"] + teamTwoGoals;
            if (teamOneGoals > teamTwoGoals) {
                // update teamOne
                pt1 += 3;
            } else if (teamOneGoals < teamTwoGoals) {
                // update teamOne
                pt2 += 3;
            } else {
                pt1 += 1;
                pt2 += 1;
            }
            // update teamOne
            mapA.set(teamOne, {teamName: teamOne, points: pt1, goals: goals1});

            // update teamTwo
            mapA.set(teamTwo, {teamName: teamTwo, points: pt2, goals: goals2});
        })

        const values = Array.from(mapA.values());
        return values;
    }

    return (
        <div>
            <div>{teamRegistrationForm()}</div>
            <br></br>
            <div>{resultSubmissionForm()}</div>
            <br></br>
            <div>{resultTable()}</div>
        </div>
    );
}