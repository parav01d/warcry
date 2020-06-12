import * as React from "react";
import { dispatch } from "./../../Flux";
import { changePage } from "./../../Flux/Action/System"
import { Box } from 'ink';
// @ts-ignore
import SelectInput from 'ink-select-input';

const OpponentWarbandPage = ({}: any) => {
	return (
	<Box height={process.stdout.getWindowSize()[1] - 1}>
		<Box flexDirection={"column"}>
			<SelectInput items={[
				{ label: "Zurück", value: "home"},
			]} onSelect={(item) => dispatch(changePage({page: `${item.value}`},{}))}/>
		</Box>
	</Box>
	);
};

export default OpponentWarbandPage;
