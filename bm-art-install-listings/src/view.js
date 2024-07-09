import { useEffect, useState } from '@wordpress/element';
import { Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createRoot } from 'react-dom/client';

const View = () => {
    const [ programFilter, setProgramFilter ] = useState('All');
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        const filterListings = () => {
            const listings = document.querySelectorAll('.listing-card');
            listings.forEach(listing => {
                const name = listing.getAttribute('data-name').toLowerCase();
                const program = listing.getAttribute('data-program').toLowerCase();
                const matchesSearch = name.includes(searchTerm.toLowerCase());
                const matchesProgram = programFilter === 'All' || program === programFilter.toLowerCase();
                if (matchesSearch && matchesProgram) {
                    listing.style.display = 'block';
                } else {
                    listing.style.display = 'none';
                }
            });
        };
        filterListings();
    }, [ programFilter, searchTerm ]);

    return (
        <div>
            <TextControl
                label={ __('Search by artwork name', 'bm-art-install-listings') }
                value={ searchTerm }
                onChange={ value => setSearchTerm(value) }
                placeholder={ __('Type to search...', 'bm-art-install-listings') }
            />
            <div className="filter-toggle">
                <Button
                    variant={ programFilter === 'All' ? 'primary' : 'secondary' }
                    onClick={ () => setProgramFilter('All') }
                >
                    { __( 'All', 'bm-art-install-listings' ) }
                </Button>
                <Button
                    variant={ programFilter === 'Honorarium' ? 'primary' : 'secondary' }
                    onClick={ () => setProgramFilter('Honorarium') }
                >
                    { __( 'Honorarium', 'bm-art-install-listings' ) }
                </Button>
                <Button
                    variant={ programFilter === 'Self-Funded' ? 'primary' : 'secondary' }
                    onClick={ () => setProgramFilter('Self-Funded') }
                >
                    { __( 'Self-Funded', 'bm-art-install-listings' ) }
                </Button>
            </div>
        </div>
    );
};

// Find the element with the ID 'bm-art-install-listings-block' and render the component there
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('#bm-art-install-listings-block');
    elements.forEach(el => {
        const root = createRoot(el);
        root.render(<View />);
    });
});
