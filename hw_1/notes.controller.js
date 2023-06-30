const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await saveNotes(notes)
  console.log(chalk.bgBlue('Note was added!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgYellow('Here is the list of notes:'))
  notes.forEach(note => {
    console.log(chalk.magenta('id:'), chalk.bgGreenBright(note.id), chalk.cyan('title:'), chalk.magenta(note.title))
  })
}

async function deleteNote(id) {
  const notes = await getNotes()
  const filtredNotes = []
  notes.filter(note => {
    if (Number(note.id) !== Number(id)) {
      filtredNotes.push(note)
    }
  })
  await saveNotes(filtredNotes)
  console.log(chalk.bgRed('id:', id, 'was deleted!'))
}

module.exports = {
  addNote, printNotes, deleteNote
}