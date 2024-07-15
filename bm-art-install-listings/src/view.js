import { store } from '@wordpress/interactivity';

store('bm-art-install-listings', {
    programFilter: 'All',
    searchTerm: '',
    actions: {
        setProgramFilter: (programFilter) => ({ programFilter }),
        setSearchTerm: (event) => ({ searchTerm: event.target.value }),
        filterListings: (state) => {
            const listings = document.querySelectorAll('.listing-card');
            listings.forEach(listing => {
                const name = listing.getAttribute('data-name').toLowerCase();
                const program = listing.getAttribute('data-program').toLowerCase();
                const matchesSearch = name.includes(state.searchTerm.toLowerCase());
                const matchesProgram = state.programFilter === 'All' || program === state.programFilter.toLowerCase();
                if (matchesSearch && matchesProgram) {
                    listing.style.display = 'block';
                } else {
                    listing.style.display = 'none';
                }
            });
        }
    },
    callbacks: {
        'filterListings': 'actions.filterListings'
    }
});

console.log('Initial state:', {
    programFilter: 'All',
    searchTerm: '',
    listings: JSON.parse(document.querySelector('[data-wp-context]').getAttribute('data-wp-context'))
});