import { useState } from "react";

export default function Table() {
    // to store input for team registration
    const [message, setMessage] = useState('');

    // use 2 maps to keep track of the teams in each group
    const [groupATeams, setGroupATeams] = useState(new Map());
    const [groupBTeams, setGroupBTeams] = useState(new Map());

    const handleTeamChange = event => {
        setMessage(event.target.value);
    };

    const handleTeamClick = event => {
        event.preventDefault();

        const data = message.split('\n');

        for (const team of data) {
            const tokens = team.split(' ')
            if (tokens.length !== 3) {
                continue;
            }

            if (parseInt(tokens[2]) === 1) {
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
    }

    const teamRegistrationForm = () => {
        return (      
            <div>
                <h1 className='title has-text-black'>Team Registration</h1>
                <b> For team registration</b>
                <textarea className="textarea" placeholder="For team registration in the format of <Team A name> <Team A registration date in DD/MM> <Team A group number>" onChange={handleTeamChange}></textarea>
                <br></br>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={handleTeamClick} className="button is-link">Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    // for result submission

    // to store input for result submission
    const [message2, setMessage2] = useState('');

    // use 2 arrays to keep track of the match results from the 2 groups
    const [groupAResults, setGroupAResults] = useState([]);
    const [groupBResults, setGroupBResults] = useState([]);

    const handleResultChange = event => {
        setMessage2(event.target.value);
    };

    const handleResultClick = event => {
        event.preventDefault();

        const data = message2.split('\n');

        const tempA = []
        const tempB = []
        
        for (const match of data) {
            const toks = match.split(' ')
            if (toks.length !== 4) {
              continue;
            }
            
            if (groupATeams.get(toks[0]) !== undefined) {
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
        setGroupAResults(tempA)
        setGroupBResults(tempB)
    }

    const resultSubmissionForm = () => {
        return (      
            <div>
                <h1 className='title has-text-black'>Result Submission</h1>
                <b> For result submission, ensure that team registration is done before submitting the results</b>
                <textarea className="textarea" placeholder="For result submission in the format <Team A name> <Team B name> <Team A goals scored> <Team B goals scored>" onChange={handleResultChange}></textarea>
                <br></br>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={handleResultClick} className="button is-link">Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    // table 

    // to hold the positions of each team in the table
    const [tableA, setTableA] = useState([]);
    const [tableB, setTableB] = useState([]);


    const getTableAToRender = () => {
        return (
            <table className="table">
            <thead>
                <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Goals for">Goals</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Goals for">Goals</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                </tr>
            </tfoot>
            <tbody>
                {tableA.map((ele, idx) => (
                    <tr key = {idx}>
                        <th>{idx+1}</th>
                        <td>{ele.teamName}</td>
                        <td>{ele.goals}</td>
                        <td>{ele.points}</td>
                    </tr>
                ))}
            </tbody>
            </table>       
        );
    };

    const getTableBToRender = () => {
        return (
            <table className="table">
            <thead>
                <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Goals for">Goals</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Goals for">Goals</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                </tr>
            </tfoot>
            <tbody>
                {tableB.map((ele, idx) => (
                    <tr key = {idx}>
                        <th>{idx+1}</th>
                        <td>{ele.teamName}</td>
                        <td>{ele.goals}</td>
                        <td>{ele.points}</td>
                    </tr>
                ))}
            </tbody>
            </table>       
        );
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
        
        // TODO: comparator is missing comparison of alternate score and register date
        return 1;
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const resultTable = () => {
        return (
            <div>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={handleTableClick} className="button is-link">Generate Table</button>
                    </div>
                </div>
                <h1 className='title has-text-black'>Table 1</h1>
                <div>{getTableAToRender()}</div>
                <br></br>
                <h1 className='title has-text-black'>Table 2</h1>
                <div>{getTableBToRender()}</div>
                <div className="column is-narrow">
                    <div className="buttons">
                        <button className="button is-danger" onClick={refreshPage}>Clear data</button>
                    </div>
                </div>
            </div>
        )}

    const generateGroupBResults = () => {
        const mapB = new Map(); //map to keep track of each team and its status of name, points and goals
        
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
            var goals2 = mapB.get(teamTwo)["goals"] + teamTwoGoals;
            if (teamOneGoals > teamTwoGoals) {
                // update teamOne
                pt1 += 3;
            } else if (teamOneGoals < teamTwoGoals) {
                // update teamTwo
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
        const mapA = new Map(); //map to keep track of each team and its status of name, points and goals
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
            var goals2 = mapA.get(teamTwo)["goals"] + teamTwoGoals;
            if (teamOneGoals > teamTwoGoals) {
                // update teamOne
                pt1 += 3;
            } else if (teamOneGoals < teamTwoGoals) {
                // update teamTwo
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
