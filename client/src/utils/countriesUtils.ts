import type Country from '@/types/Country';

export const searchAndSortCountries = (countries: Country[], searchTerm: string) => {
	const searchTermLower = searchTerm.toLowerCase();

	const filteredCountries = countries.filter((country) => {
		const fullName = `${country.name} ${country.phonePrefix}`.toLowerCase();
		return fullName.includes(searchTermLower);
	});

	const sortedCountries = filteredCountries.sort(
		(a, b) => a.name.toLowerCase().indexOf(searchTermLower) - b.name.toLowerCase().indexOf(searchTermLower),
	);

	return sortedCountries;
};
