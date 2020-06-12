import * as React from "react";
import { store$ } from "./src/Flux";
import Home from "./src/Components/Page/Home";
import FriendlyWarband from "./src/Components/Page/FriendlyWarband";
import OpponentWarband from "./src/Components/Page/OpponentWarband";
import Statistc from "./src/Components/Page/Statistic";
import { render } from 'ink';

const Provider = ({state }: any) => {
	return (
	<React.Fragment>
		{
			state.systemStore.page === "home"
			? <Home state={state}/>
			: null
		}
		{
			state.systemStore.page === "friendlywarband"
			? <FriendlyWarband state={state}/>
			: null
		}
		{
			state.systemStore.page === "opponentwarband"
			? <OpponentWarband state={state}/>
			: null
		}
		{
			state.systemStore.page === "statistic"
			? <Statistc state={state}/>
			: null
		}
	</React.Fragment>
	);
};

store$.subscribe((state) => {
	var lines = process.stdout.getWindowSize()[1] - 1;
	for(var i = 0; i < lines; i++) {
	    console.log('\r\n');
	}
  render(<Provider state={state}></Provider>);
});
