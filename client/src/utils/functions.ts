export const ScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const scroll = (scrollConteiner: HTMLDivElement) => {
    if (scrollConteiner) {
        scrollConteiner.addEventListener("wheel", (e) => {
            e.preventDefault();
            scrollConteiner.scrollLeft += e.deltaY;
        });
    }
};