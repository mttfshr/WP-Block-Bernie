import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { 
    Button, 
    Card, 
    CardBody, 
    CardHeader, 
    CardFooter, 
    CardMedia,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    TextControl 
} from '@wordpress/components';

const CACHE_KEY = 'bmArtInstallListings';
const CACHE_TIME_KEY = 'bmArtInstallListingsTimestamp';
const MAX_CACHE_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export default function Edit( { apiUrl, authToken } ) {
    const blockProps = useBlockProps();
    const [ listings, setListings ] = useState([]);
    const [ programFilter, setProgramFilter ] = useState('All');
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect( () => {
        const fetchListings = async () => {
            try {
                const now = new Date().getTime();
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

                if (cachedData && cachedTime && (now - cachedTime) < MAX_CACHE_TIME) {
                    setListings(JSON.parse(cachedData));
                } else {
                    const response = await fetch('http://localhost:3000/api/art-installs');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log('API Response:', data);

                    // Sort listings by name A-Z with toString transformation
                    const sortedData = data.sort((a, b) => {
                        const nameA = a.name.toString().toLowerCase();
                        const nameB = b.name.toString().toLowerCase();
                        return nameA > nameB ? 1 : -1;
                    });

                    // Cache the data and timestamp in localStorage
                    localStorage.setItem(CACHE_KEY, JSON.stringify(sortedData));
                    localStorage.setItem(CACHE_TIME_KEY, now.toString());
                    setListings(sortedData);
                }

                // Parse query parameters
                const params = new URLSearchParams(window.location.search);
                const nameParam = params.get('name') || '';
                const programFilterParam = params.get('program') || 'All';

                // Set initial state based on query parameters
                setSearchTerm(nameParam);
                setProgramFilter(programFilterParam);
            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };

        fetchListings();
    }, [ apiUrl, authToken ]);

    const filteredListings = listings
        .filter(listing => programFilter === 'All' || listing.program.toString().toLowerCase() === programFilter.toString().toLowerCase())
        .filter(listing => listing.name.toString().toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div { ...blockProps }>
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
            { filteredListings.map(listing => (
                <Card key={ listing.uid } className="listing-card">
                    <CardHeader>
                        <Heading>{ listing.name }</Heading>
                    </CardHeader>
                    <CardMedia>
                        <img src={ listing.images[0].thumbnail_url } alt={ listing.name } />
                    </CardMedia>
                    <CardBody>
                        <Text>{ listing.description }</Text>
                    </CardBody>
                    <CardFooter className="card-footer">
                        <Button variant="secondary">{ listing.year }</Button>
                        <Button variant="secondary">{ listing.artist }</Button>
                        <Button variant="secondary">{ listing.hometown }</Button>
                        <Button variant="secondary">{ listing.program }</Button>
                        { listing.donation_link && (
                            <Button 
                                variant="primary" 
                                href={ listing.donation_link }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                { __( 'Donate', 'bm-art-install-listings' ) }
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            )) }
        </div>
    );
}
