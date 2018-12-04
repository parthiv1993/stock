import React from 'react'
import AppConstants from './AppConstants';
import Record from './Record';
import PropTypes from 'prop-types';
import {getTextForLastUpdatedTime } from './Utils';

export class DisplayTable extends React.PureComponent {

    componentDidMount() {
        setInterval(this.forceUpdate.bind(this),5000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    createRow(row,i) {
        return (
            <tr key={i}>
                <td>
                    {row.scriptName}
                </td>
                <td bgcolor={AppConstants.COLOUR_SCHEMA[row.cellColour]}>
                    {row.price}
                </td>
                <td>
                    {getTextForLastUpdatedTime(row.lastUpdated)}
                </td>
            </tr>
        )
    } 

    render() {
        const data = this.props.data ;
        return (
            <div>
                {data.length>0 && <table border={1}>
                    <tbody>
                        <tr>
                            <th>
                                Stock Name
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Last Updated
                            </th>
                        </tr>
                        {data.map(this.createRow)}
                    </tbody>
                </table>}
            </div>
        )
    }
}

export default DisplayTable

DisplayTable.propTypes = {
    data:PropTypes.arrayOf(PropTypes.instanceOf(Record)).isRequired
}
