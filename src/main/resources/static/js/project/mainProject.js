$(function (){
    let hom_tab = '#home-tab';
    let home_tabPane = '#home-tab-pane'
    $(hom_tab).addClass('active')
    $(home_tabPane).addClass('show active')

    $('.mainNav[data-bs-toggle="tab"]').on('shown.bs.tab', function (e){
        localStorage.setItem('selectedTab', $(e.target).attr('id'))
        localStorage.setItem('selectedPane', $(e.target).attr('data-bs-target'))
    })
    let selectedTab = localStorage.getItem('selectedTab');
    let selectedPane = localStorage.getItem('selectedPane');

    if (selectedTab){

        $(hom_tab).removeClass('active')
        $(home_tabPane).removeClass('show active')
        $('#'+selectedTab).addClass('active');
        $(selectedPane).addClass('show active');


    }

    $('.mainNav').click(function (){
        let tabPane = $(this).attr('data-bs-target')

        //$(tabPane).load(location.href + ' ' + tabPane)

    })

})