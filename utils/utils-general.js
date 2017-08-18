export const slugDate = (date_string) => {
	const date = new Date(date_string);
	const slug_date = date.toISOString().replace(/-/g,'').replace(/:/g,'').replace(/\./g,'');
	return slug_date;
}

export const makeBaseUrl = (req) => {
	console.log(req.get('Host'));
	let baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	if (req && req.get('Host').indexOf(":") === -1) baseUrl = baseUrl + ":8080";
	return baseUrl;
}