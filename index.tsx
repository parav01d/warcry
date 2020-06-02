import * as React from "react";
import { dispatch, store$ } from "./src/Flux";
import { addFriendlyFighter } from "./src/Flux/Action/Warband"
import { render, Box, Color } from 'ink';

const Provider = ({state }: any) => {
	return <Box width={100} height={40}>
		<Color hex="#000000" bgHex="#FFFFFF">
			{state.warbandStore.updatedAt} tests passed
		</Color>
	</Box>;
};

store$.subscribe((state) => {
  render(<Provider state={state}></Provider>);
});

setTimeout(() => {
	dispatch(addFriendlyFighter({id: 1}, {}))
},1000);

setTimeout(() => {
	dispatch(addFriendlyFighter({id: 1}, {}))
},2000);

setTimeout(() => {
	dispatch(addFriendlyFighter({id: 1}, {}))

},3000);
