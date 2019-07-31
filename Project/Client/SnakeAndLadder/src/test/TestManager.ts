class TestManager {
	private static instance: TestManager;
	public static get Instance(): TestManager {
		if (this.instance == null) {
			this.instance = new TestManager();
		}
		return this.instance;
	}
	
	public get name():string{
		return this.name;
	}
	public set name(value){
		
	}

	public constructor() {
		this.name = 'word'
	}
	


	
	
}

