$(document).ready(function() {
    $('.filter-item').click(function() {
        const value = $(this).attr('data-filter');
        
        if (value == 'all') {
            $('.post-box').show('1000');
        } else {
            // Hide all post-box elements
            $('.post-box').hide('1000');

            // Show posts that match the selected filter
            $('.' + value).show('1000');
        }
        
        // Add 'active-filter' class to the clicked item and remove from siblings
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});
