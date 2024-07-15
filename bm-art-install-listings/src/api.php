<?php

function fetch_api_data() {
    $api_url = get_option('bm_api_url');
    $auth_token = get_option('bm_auth_token');

    // Use host.docker.internal instead of localhost for Docker containers
    $api_url = str_replace('localhost', 'host.docker.internal', $api_url);

    $response = wp_remote_get($api_url, array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $auth_token,
        ),
    ));

    if (is_wp_error($response)) {
        return null;
    }

    $data = wp_remote_retrieve_body($response);
    $listings = json_decode($data, true);

    if (empty($listings)) {
        return null;
    }

    return $listings;
}
?>
