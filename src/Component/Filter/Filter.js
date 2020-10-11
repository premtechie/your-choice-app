import React,{Component} from 'react'
import './Filter.css'
import { Const } from '../Constant/Const'


export default class Filter extends Component{

    sortHandler=(event)=>{
        console.log('FilterConsole',event)
        this.props.sortHandler(event.target.value)
    }

    render(){
        return(
            <div className='filter'>
                <div>
                    <p>Order</p>
                    <select onChange={this.sortHandler} >
                        <option>{Const.filterState.NONE}</option>
                        <option>{Const.filterState.LOWEST}</option>
                        <option>{Const.filterState.HIGHEST}</option>
                    </select>
                </div>
                {/* <div>
                    <p>Filter </p>
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option>ALL</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>S</option>
                    </select>
                </div> */}
            </div>
        )
    }
}