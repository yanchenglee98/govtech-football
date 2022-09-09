import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function TeamList() { 
    // use react hooks to manage states
    const [teams, setTeams] = useState([]);
    const sampleTeams = [
        {name:'firstTeam', reg: '17/05', grp: '2'},
        {name:'secondTeam', reg: '07/02', grp: '2'}
    ];
    
    useEffect(() => {
        setTeams(sampleTeams);
    }, []);// run this effect hook whenever something changes in this array else it will keep rendering
 

    const getTeamsToRender = () => {
        return teams.map((team, idx) => {
            console.log(teams);
            return (
                // mt-3 defines margins
                <div className="columns team mt-3 is-vcentered"> 
                    <div className="column has-text-left">
                        <div key={idx}>
                            <div>{team.name}, {team.reg}, {team.grp} </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleAddNewTeam = (data) => {
        const newTeamList = [...teams];
        newTeamList.push({name: data.name, reg: data.reg, grp:data.grp});
        setTeams(newTeamList);
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
        handleAddNewTeam(data);
    }

    const Form = () => {
        return (
            <form className="has-text-left" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Team Name</label>
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            placeholder="Team Name"
                            {...register("name", {required:true, maxLength:80})}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Registration Date</label>
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            placeholder="22/04"
                            {...register("reg", {required:true, maxLength:80})}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Group Number</label>
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            placeholder="1"
                            {...register("grp", {required:true, maxLength:80})}
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
                <h1 class="title">Teams List</h1>
                <div>{Form()}</div>
                <hr/>
                <div className="teamList">{getTeamsToRender()}</div>
            </div> // any kind of javascript or logic needs to be enclosed with curly brackets
        );
}