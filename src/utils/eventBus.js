const eventBus = {
	on(event, callback) {
		if (typeof window !== 'undefined')
			document.addEventListener(event, (e) => callback(e.detail));
	},
	dispatch(event, data) {
		if (typeof window !== 'undefined')
			document.dispatchEvent(
				new CustomEvent(event, { detail: data }),
			);
	},
	remove(event, callback) {
		if (typeof window !== 'undefined')
			document.removeEventListener(event, callback);
	},
};

export default eventBus;
