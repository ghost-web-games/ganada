import * as Hangul from "hangul-js"
import { WordSet } from "./wordset"

export type WordEntry = {
    Word: string
    Wordlist: string[]
}

export default class GameStore {
    coin: number
    wordList: Array<WordEntry>
    currWord: number
    soundFlag: boolean
    constructor() {
        this.coin = 0
        this.soundFlag = true
        this.currWord = Math.floor(WordSet.length * Math.random())
        this.wordList = new Array<WordEntry>()
        WordSet.forEach((w)=> {
            this.wordList.push({Word: w, Wordlist: Hangul.disassemble(w)})
        })
    }
    SoundOff() {
        this.soundFlag = false
        window.speechSynthesis.cancel()
    }
    SoundOn() {
        this.soundFlag = true
    }
    SoundCheck(): boolean { return this.soundFlag }

    NextWord(): WordEntry {
        this.currWord = ++this.currWord % this.wordList.length 
        return this.wordList[this.currWord]
    }

    GetWord(): WordEntry {
        return this.wordList[this.currWord]
    }
}