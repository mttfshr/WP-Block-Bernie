import 'preact/debug';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: Edit, // For the edit option we use the Edit component
    save, // For the save option we use the save function. This is a shorthand for save: save
});