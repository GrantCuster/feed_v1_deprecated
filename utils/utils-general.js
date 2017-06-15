export const slugDate = (date_string) => {
	const date = new Date(date_string);
	const slug_date = date.toISOString().replace(/-/g,'').replace(/:/g,'').replace(/\./g,'');
	return slug_date;
}