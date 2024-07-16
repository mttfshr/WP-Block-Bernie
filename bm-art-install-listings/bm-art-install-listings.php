<?php
/**
 * Plugin Name: BM Art Install Listings
 * Description: A Gutenberg block plugin to display art install listings.
 * Version: 0.1.0
 * Author: Your Name
 */

defined('ABSPATH') || exit;

function bm_art_install_listings_register_settings() {
    register_setting('bm_settings_group', 'bm_api_url');
    register_setting('bm_settings_group', 'bm_auth_token');
}
add_action('admin_init', 'bm_art_install_listings_register_settings');

function bm_art_install_listings_register_options_page() {
    add_options_page(
        'BM Art Install Listings Settings',
        'BM Art Install Listings',
        'manage_options',
        'bm-art-install-listings',
        'bm_art_install_listings_options_page'
    );
}
add_action('admin_menu', 'bm_art_install_listings_register_options_page');

function bm_art_install_listings_options_page() {
    ?>
    <div class="wrap">
        <h1>BM Art Install Listings Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('bm_settings_group'); ?>
            <?php do_settings_sections('bm_settings_group'); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">API URL</th>
                    <td><input type="text" name="bm_api_url" value="<?php echo esc_attr(get_option('bm_api_url')); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Auth Token</th>
                    <td><input type="text" name="bm_auth_token" value="<?php echo esc_attr(get_option('bm_auth_token')); ?>" /></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function bm_art_install_listings_enqueue_block_assets() {
    $style_path = plugin_dir_path( __FILE__ ) . 'build/style.css';
	$editor_style_path = plugin_dir_path( __FILE__ ) . 'build/editor.css';
    $script_path = plugin_dir_path( __FILE__ ) . 'build/index.js';
    $view_script_path = plugin_dir_path( __FILE__ ) . 'build/view.js';

    // Enqueue style if it exists
    if ( file_exists( $style_path ) ) {
        wp_enqueue_style(
            'bm-art-install-listings-style',
            plugins_url( 'build/style.css', __FILE__ ),
            array(),
            filemtime( $style_path )
        );

		wp_enqueue_style(
            'bm-art-install-listings-editor-style',
            plugins_url( 'build/editor.css', __FILE__ ),
            array(),
            filemtime( $editor_style_path )
        );
    }

	// Enqueue Gutenberg's default styles
	wp_enqueue_style('wp-block-library');
	wp_enqueue_style('wp-block-library-theme');

    // Enqueue editor script if it exists
    if ( file_exists( $script_path ) ) {
        wp_enqueue_script(
            'bm-art-install-listings-script',
            plugins_url( 'build/index.js', __FILE__ ),
            array( 'wp-blocks', 'wp-element', 'wp-block-editor' ), // Ensure dependencies are loaded
            filemtime( $script_path ),
            true
        );

        wp_localize_script( 'bm-art-install-listings-script', 'bmSettings', array(
            'apiUrl' => get_option( 'bm_api_url' ),
            'authToken' => get_option( 'bm_auth_token' ),
        ));
    }

    // Enqueue view script if it exists
    if ( file_exists( $view_script_path ) ) {
        wp_enqueue_script(
            'bm-art-install-listings-view-script',
            plugins_url( 'build/view.js', __FILE__ ),
            array( 'wp-element' ),
            filemtime( $view_script_path ),
            true
        );
    }
}
add_action('enqueue_block_assets', 'bm_art_install_listings_enqueue_block_assets');

// Register the block type using the metadata loaded from the `block.json` file.
function create_block_bm_art_install_listings_block_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_bm_art_install_listings_block_init');
?>
