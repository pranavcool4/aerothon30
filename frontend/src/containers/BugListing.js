import React, { useState, useEffect } from "react";
import axios from 'axios'
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Loader from '../components/common/Loader'


const columns = [
	{
		name: "Email",
		selector: "email",
		sortable: true,
	},
	{
		name: "Bug Message",
		selector: "description",
	},
	{
		name: "Domain",
		selector: "domain",
		sortable: true,
	},
	{
		name: "Created Time",
		selector: "createdAt",
		sortable: true,
	},
];

const isIndeterminate = (indeterminate) => indeterminate;
const selectableRowsComponentProps = { indeterminate: isIndeterminate };

function BugListing() {
    const [data, setData] = useState([]);
	const [load, setLoad] = useState(true);
    useEffect(()=>{
		const response = axios.get('/api/products/viewbugs');
		response.then(res=>setData(res.data))
		setLoad(false)
    },[])

    return (
		<div className="px-28 py-4">
			{load && <Loader />}
			<Card>
				<DataTable
					title="Data"
					columns={columns}
					data={data}
					defaultSortField="email"
					sortIcon={<SortIcon />}
					pagination
					selectableRows
					selectableRowsComponent={Checkbox}
					selectableRowsComponentProps={selectableRowsComponentProps}
				/>
			</Card>
		</div>
	);
}

export default BugListing;