import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ResultList() { 
    // use react hooks to manage states
    const [results, setResults] = useState([]);
    const sampleResults = [
        {team1:'firstTeam', team2:'secondTeam', for: '0', against: '3'},
        {team1:'thirdTeam', team2:'fourthTeam', for: '1', against: '1'}
    ];
    
    useEffect(() => {
        setResults(sampleResults);
    }, []);// run this effect hook whenever something changes in this array else it will keep rendering
 

    const getResultsToRender = () => {
        return results.map((result, idx) => {
            console.log(results);
            return (
                // mt-3 defines margins
                <div className="columns result mt-3 is-vcentered"> 
                    <div className="column has-text-left">
                        <div key={idx}>
                            <div>{result.team1} {result.for} - {result.against} {result.team2}</div>
                        </div>
                    </div>
                    <div className="column is-narrow">
                        <div className="buttons">
                            <button className="button is-danger" onClick={() => handleDeleteResult(result, idx)}>Delete</button>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleDeleteResult = (result, idx) => {
        // update the list 
        const newResults = [...results];
        newResults.splice(idx, 1);
        setResults(newResults);
    }

    const handleAddNewResult = (data) => {
        const newResultList = [...results];
        newResultList.push({team1: data.team1, team2: data.team2, for:data.for, against: data.against});
        setResults(newResultList);
    }

    // form 
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        handleAddNewResult(data);
    }

    const Form = () => {
        return (
            <form className="has-text-left" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Team 1</label>
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            placeholder="Team 1"
                            {...register("team1", {required:true, maxLength:80})}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Team 2</label>
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            placeholder="Team 2"
                            {...register("team2", {required:true, maxLength:80})}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Team 1 Goals Scored</label>
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            placeholder="1"
                            {...register("for", {required:true, maxLength:80})}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Team 2 Goals Scored</label>
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            placeholder="1"
                            {...register("against", {required:true, maxLength:80})}
                        />
                    </div>
                </div>

                <div className="control">
                    <button className="button is-link" type="submit">
                        Submit
                    </button>
                </div>
                
            </form>
        );
    }

    return (
            <div>
                <h1 class="title">Match Results</h1>
                <div>{Form()}</div>
                <hr/>
                <div className="resultList">{getResultsToRender()}</div>
            </div> // any kind of javascript or logic needs to be enclosed with curly brackets
        );
}