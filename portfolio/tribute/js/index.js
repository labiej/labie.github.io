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
	var init = function() {
		// Set parameters if data attributes are defined
		_multiExpand = _setIfDefined( _container.data('multi-expand'), _multiExpand );
		_collapseAll = _setIfDefined( _container.data('collapse-all'), _collapseAll );


	};

	var openContent = function() {
		// Use clear names
		var $button = $( this );
		var $content = $button.next();

		// Open current content and highlight tab
		$button.addClass( 'active' );
		$content.slideDown();

		// Attach close content handler
		$button.one( 'click', closeContent );

		// Apply multi-expand rules

		$( 'button.active' ).not( $button ).removeClass( 'active' );
		$( '.accordion-content' ).not( $content ).slideUp();

		// Filthy hack to remove outline ( FIX WITH CSS );
		// $button.blur();
	};

	var closeContent = function() {
		// Use clear names
		var $button = $( this );
		var $content = $button.next();

		// Close content and remove active class
		$content.slideUp( '' );
		$button.removeClass( 'active' );

		// Attach openContent handler
		$button.one( 'click', openContent );

		// Show first entry if collapse-all is set to FALSE


	};

	var dbgStorage = function() {
		console.log( 'Multi expand allowed? ' + _multiExpand );
		console.log( 'Collapse all allowed? ' + _collapseAll );
	};


	// Reveal public members of module
	return {
		init: init,
		openContent: openContent,
		closeContent: closeContent,
		dbgStorage: dbgStorage
	};

} );




var accordionHandler = accordion( jQuery );
accordionHandler.init();

accordionHandler.dbgStorage();

$( 'button.accordion-title.active' ).one( 'click', accordionHandler.closeContent );
$( 'button.accordion-title:not(.active)' ).one( 'click', accordionHandler.openContent );