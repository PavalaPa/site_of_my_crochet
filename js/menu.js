document.addEventListener('DOMContentLoaded', () => {
	const dropdowns  = document.querySelectorAll('.dropdown');
	
	dropdowns.forEach(dropdown => {
		const button = dropdown.querySelector('.dropbtn');
        const menu = dropdown.querySelector('.dropdown-content');

		button.addEventListener('click',() => {
			dropdown.classList.toggle('show');

			// закрыть все остальные
			dropdowns.forEach(d => {
				if (d !== dropdown) {
					d.classList.remove('show');
				}
			});
		});
	});

	window.addEventListener('click', (e) => {
		const target=e.target;
		if(!target.closest('.dropdown')&&!target.closest('.menu')){
			dropdowns.forEach(d => d.classList.remove('show'));
		}
	})	
});