document.addEventListener('DOMContentLoaded', () => {
	const ListMenu = document.querySelector('#list-menu');
	const Pulldown=document.querySelector('#pulldown');
	
	ListMenu.addEventListener('click',() => {
		Pulldown.classList.toggle('show');
	});

	window.addEventListener('click', (e) => {
		const target=e.target;
		if(!target.closest('#pulldown')&&!target.closest('#list-menu')){
			Pulldown.classList.remove('show');
		}
	})	
});
