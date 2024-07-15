<?php

function bm_art_install_listings_render_callback( $attributes ) {
    $api_url = get_option('bm_api_url');
    $auth_token = get_option('bm_auth_token');

    // Use host.docker.internal instead of localhost for Docker containers
    $api_url = str_replace('localhost', 'host.docker.internal', $api_url);

    $response = wp_remote_get( $api_url, array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $auth_token,
        ),
    ));

    if ( is_wp_error( $response ) ) {
        return '<div>' . __('Failed to fetch data from API', 'bm-art-install-listings') . '</div>';
    }

    $data = wp_remote_retrieve_body( $response );
    $listings = json_decode( $data, true );

    if ( empty( $listings ) ) {
        return '<div>' . __('No listings available', 'bm-art-install-listings') . '</div>';
    }

    ob_start();
    ?>
    <div id="bm-art-install-listings-block" data-wp-interactive="bmArtInstallListings">
        <div>
            <div id="filter-controls">
                <!-- Filter controls will be rendered by JavaScript -->
            </div>
            <div id="bm-art-install-listings">
                <?php foreach ( $listings as $listing ) : ?>
                    <div class="listing-card" data-name="<?php echo esc_attr( $listing['name'] ); ?>" data-program="<?php echo esc_attr( $listing['program'] ); ?>">
                        <div class="card-header">
                            <h3><?php echo esc_html( $listing['name'] ); ?></h3>
                        </div>
                        <div class="card-media">
                            <img src="<?php echo esc_url( $listing['images'][0]['thumbnail_url'] ); ?>" alt="<?php echo esc_attr( $listing['name'] ); ?>" />
                        </div>
                        <div class="card-body">
                            <p><?php echo esc_html( $listing['description'] ); ?></p>
                        </div>
                        <div class="card-footer">
                            <button><?php echo esc_html( $listing['year'] ); ?></button>
                            <button><?php echo esc_html( $listing['artist'] ); ?></button>
                            <button><?php echo esc_html( $listing['hometown'] ); ?></button>
                            <button><?php echo esc_html( $listing['program'] ); ?></button>
                            <?php if ( ! empty( $listing['donation_link'] ) ) : ?>
                                <a href="<?php echo esc_url( $listing['donation_link'] ); ?>" class="button primary" target="_blank" rel="noopener noreferrer"><?php _e( 'Donate', 'bm-art-install-listings' ); ?></a>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
