// src/components/PostCard.tsx
'use client'

import { useState } from 'react'
import { deletePost } from '@/app/actions'

type PostProps = {
  id: number
  title: string
  body: string
  authorName: string
}

export default function PostCard({ id, title, body, authorName }: PostProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const result = await deletePost(id)
      
      if (!result.success) {
        alert(result.message) 
      } else {
        setIsOpen(false) 
      }
    } catch (e) {
      console.error(e)
      alert("Error de conexión. Verifica tu internet e intenta de nuevo.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-xl mb-2 capitalize text-gray-800">{title}</h2>
          <p className="text-gray-600 mb-4 text-sm line-clamp-3">{body}</p>
          <p className="text-xs text-blue-600 font-medium mb-4">Escrito por: {authorName}</p>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-50 text-red-600 px-4 py-2 rounded text-sm font-semibold hover:bg-red-100 self-start transition-colors"
        >
          Eliminar Post
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-2">¿Estás seguro?</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Esta acción eliminará el post permanentemente.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 disabled:opacity-50 flex items-center"
              >
                {isDeleting ? 'Intentando borrar...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}