/* LIGHTWEIGHT, PORTABLE ACCORDION
* Create a semantically sound accordion adapted to HTML5
* Settings available through data-* arguments
*/

var accordion = (function( $, container ) {

	//Private storage
	var _multiExpand = true;
	var _collapseAll = true;
	var _container = ( container !== undefined ) ? container
																							 : $( '[data-accordion]' );

	// Private functions
	var _setIfDefined = function( argument, defaultVal ){
		return ( argument !== undefined ) ? argument : defaultVal;
	};

	// Public facing functions

	// Initialize accordion
	var init = function() {
		// Set parameters if data attributes are defined
		_multiExpand = _setIfDefined( _container.data('multi-expand'), _multiExpand );
		_collapseAll = _setIfDefined( _container.data('collapse-all'), _collapseAll );

		$( 'button.accordion-title.active' ).one( 'click', closeContent );
		$( 'button.accordion-title:not(.active)' ).one( 'click', openContent );

	};

	// Get and Set settings

	var getSettings = function() {
		return {
			"multi-expand": _multiExpand,
			"collapse-all": _collapseAll
		};
	};

	var setSettings = function( newSettings ) {
		if ( typeof newSettings !== "object" )
			return null;

		// Insert new settings
		_multiExpand = _setIfDefined( newSettings[ 'multi-expand' ], _multiExpand );
		_collapseAll = _setIfDefined( newSettings[ 'collapse-all' ], _collapseAll );

		// Change data-* attributes
		_container.data( 'multi-expand', _multiExpand );
		_container.data( 'collapse-all', _collapseAll );

		// Return the new settings
		return getSettings();
	};

	// Accordion functionality
	var openContent = function() {
		// Use clear names
		var $button = $( this );
		var $content = $button.next();

		// Open current content and highlight tab...
		$button.addClass( 'active' );
		$content.slideDown();

		// Attach close content handler:
		$button.one( 'click', closeContent );

		// Apply multi-expand rules...
		if( !_multiExpand ){
			$( 'button.active' ).not( $button ).removeClass( 'active' );
			$( '.accordion-content' ).not( $content ).slideUp();
		}

		// Filthy hack to remove outline ( FIX WITH CSS );
		$button.blur();
	};

	var closeContent = function() {
		// Use clear names
		var $button = $( this );
		var $content = $button.next();
		var $allButtons = $( 'button.accordion-title' );

		// Close content and remove active class
		$content.slideUp( '' );
		$button.removeClass( 'active' );

		// Attach openContent handler
		$button.one( 'click', openContent );

		// Show first entry if collapse-all is set to FALSE
		if( !_collapseAll && $( 'button.accordion-title.active').length === 0 ){
			$allButtons[0].click();
		}

		// Remove focus after click
		$button.blur();
	};

	var dbgStorage = function() {
		console.log( 'Multi expand allowed? ' + _multiExpand );
		console.log( 'Collapse all allowed? ' + _collapseAll );
	};


	// Reveal public members of module
	return {
		init: init,
		getSettings: getSettings,
		setSettings: setSettings,
		openContent: openContent,
		//closeContent: closeContent,
		dbgStorage: dbgStorage
	};

} );

var accordionHandler = accordion( jQuery );
accordionHandler.init();
