import React, { Component, MouseEvent } from 'react';
import { isRecord } from './record';

type TodayProps = {
    //onAdd: () => void;
    //onCompleteList: () => void; 
};

type TodayState = {
    taskInput: string; //mirrors text field inputs
    error: string;
}

export class Today extends Component<TodayProps, TodayState>{
    
    constructor(props: TodayProps){
        super(props);
        this.state = {taskInput: "", error: ""};
    }

    render = (): JSX.Element =>{
        return(
        <div>
            <h2>Today's Todo List</h2>
        </div>
        );
    };
}
