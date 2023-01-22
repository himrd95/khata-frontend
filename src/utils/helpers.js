export const compareDate = (a, b) => {
	const date1 = a.split('/').reverse().map(Number);
	date1[1] = date1[1] - 1;
	const date2 = b.split('/').reverse().map(Number);
	date2[1] = date2[1] - 1;

	const first = new Date(...date1);
	const second = new Date(...date2);

	return first - second;
};
