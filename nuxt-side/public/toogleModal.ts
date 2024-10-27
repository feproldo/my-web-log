export class toggleModal {
    private time: number;
    private classOpen: string;
    private classClose: string;
    
    public classCurrent = ref("");
    public isActive = ref(false);

    private istimeout = false;
    constructor(time: number = 1000, classOpen: string, classClose: string) {
        this.time = time;
        this.classOpen = classOpen;
        this.classClose = classClose;

        this.classCurrent.value = classClose;
    }
    public toggle(): void {
        if(this.isActive.value) {
            if(this.istimeout) return;
            this.istimeout = true
            this.classCurrent.value = this.classClose;
            setTimeout(() => {
                this.istimeout = false;
                this.isActive.value = !this.isActive.value;
            }, this.time)
        }
        else {
            if(this.istimeout) return;
            setTimeout(() => this.isActive.value = !this.isActive.value);
            this.classCurrent.value = this.classOpen;
            this.istimeout = true;
            setTimeout(() => {
                this.istimeout = false
            }, this.time);
        }
    }
    public turn(to?: boolean): void {
        if(to == undefined) this.toggle()
        else {
            if(to == false) {
                this.classCurrent.value = this.classClose;
                setTimeout(() => {
                    this.isActive.value = false;
                    console.log(this.isActive.value)
                }, this.time)
                console.log(this.isActive.value)
            }
            else {
                this.isActive.value = true;
                setTimeout(() => this.classCurrent.value = this.classOpen);
            }
        }
    }
}