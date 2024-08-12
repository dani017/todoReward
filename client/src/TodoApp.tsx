import React, { Component } from "react";
import { Today } from './Today'
//import { PastLists } from '.PastLists'

//Indicates which page to show
type Page = {kind: "today"} | {kind: "past lists"}
type TodoAppState = {
    page: Page
};
//TODO: add "complete list" button when a list is finished
//TODO: add "add item" button to add a task
//TODO: task can be completed (strike thru) or edited

export class TodoApp extends Component<{}, TodoAppState>{
    constructor(props: {}){
        super(props);

        this.state = {page: {kind: "today"}};
    }
     render = (): JSX.Element => {
        if (this.state.page.kind === "past lists"){
            //return <PastLists />
            return <Today/>
        }else{ //defalut to return todays list
            return <Today /> 
        }
     }
}