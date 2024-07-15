<?php
include_once 'api.php';

$listings = fetch_api_data();

if ($listings === null) {
    echo '<script>console.error("Failed to fetch data from API or no listings available");</script>';
    return '<div>' . __('Failed to fetch data from API or no listings available', 'bm-art-install-listings') . '</div>';
}

$listings_json = htmlspecialchars(json_encode($listings), ENT_QUOTES, 'UTF-8');
?>

<div 
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="bm-art-install-listings"
    data-wp-context='{ <?php echo $listings; ?> }'
>
    <div id="filter-controls">
        <input 
            type="text" 
            id="search-term" 
            placeholder="<?php esc_attr_e('Search by artwork name', 'bm-art-install-listings'); ?>" 
            data-wp-on--input="actions.setSearchTerm"
        />
        <div class="filter-toggle">
            <button data-filter="All" data-wp-on--click="actions.setProgramFilter"><?php _e('All', 'bm-art-install-listings'); ?></button>
            <button data-filter="Honorarium" data-wp-on--click="actions.setProgramFilter"><?php _e('Honorarium', 'bm-art-install-listings'); ?></button>
            <button data-filter="Self-Funded" data-wp-on--click="actions.setProgramFilter"><?php _e('Self-Funded', 'bm-art-install-listings'); ?></button>
        </div>
    </div>
    <div id="bm-art-install-listings">
        <?php foreach ($listings as $listing) : ?>
            <div class="listing-card" data-name="<?php echo esc_attr($listing['name']); ?>" data-program="<?php echo esc_attr($listing['program']); ?>">
                <div class="card-header">
                    <h3 data-wp-text="context.item.name"><?php echo esc_html($listing['name']); ?></h3>
                </div>
                <div class="card-media">
                    <img src="<?php echo esc_url($listing['images'][0]['thumbnail_url']); ?>" alt="<?php echo esc_attr($listing['name']); ?>" data-wp-attr--src="context.item.images.0.thumbnail_url" />
                </div>
                <div class="card-body">
                    <p data-wp-text="context.item.description"><?php echo esc_html($listing['description']); ?></p>
                </div>
                <div class="card-footer">
                    <button data-wp-text="context.item.year"><?php echo esc_html($listing['year']); ?></button>
                    <button data-wp-text="context.item.artist"><?php echo esc_html($listing['artist']); ?></button>
                    <button data-wp-text="context.item.hometown"><?php echo esc_html($listing['hometown']); ?></button>
                    <button data-wp-text="context.item.program"><?php echo esc_html($listing['program']); ?></button>
                    <?php if (!empty($listing['donation_link'])) : ?>
                        <a href="<?php echo esc_url($listing['donation_link']); ?>" class="button primary" target="_blank" rel="noopener noreferrer" data-wp-attr--href="context.item.donation_link">
                            <?php _e('Donate', 'bm-art-install-listings'); ?>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?> 
    </div>
</div>
