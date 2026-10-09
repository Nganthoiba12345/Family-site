'use client'

import React, { useState, useMemo } from 'react'
import { FamilyMemberCard } from './FamilyMemberCard'
import { Search, Filter, Users, Sparkles } from 'lucide-react'

interface FamilyDirectoryProps {
  members: any[]
}

export function FamilyDirectory({ members }: FamilyDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all')
  const [selectedBranch, setSelectedBranch] = useState<string>('all')

  const branches = [
    { label: 'All Branches', value: 'all' },
    { label: 'Roots (Grandparents)', value: 'Roots' },
    { label: 'Uncle 1 Branch', value: 'Uncle 1 Branch' },
    { label: 'Uncle 2 Branch', value: 'Uncle 2 Branch' },
    { label: 'Uncle 3 Branch', value: 'Uncle 3 Branch' },
    { label: 'Aunty Branch', value: 'Aunty Branch' },
  ]

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Search
      const matchesSearch =
        member.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.occupation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.relationship?.toLowerCase().includes(searchQuery.toLowerCase())

      // Generation filter
      const matchesGen = selectedGen === 'all' || member.generation === selectedGen

      // Branch filter
      const matchesBranch = selectedBranch === 'all' || member.branch === selectedBranch

      return matchesSearch && matchesGen && matchesBranch
    })
  }, [members, searchQuery, selectedGen, selectedBranch])

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm glass-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, profession..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all"
            />
          </div>

          {/* Generation Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase shrink-0">Gen:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto w-full py-1">
              {[
                { label: 'All', value: 'all' },
                { label: 'Gen 1', value: 1 },
                { label: 'Gen 2', value: 2 },
                { label: 'Gen 3', value: 3 },
              ].map((g) => (
                <button
                  key={g.label}
                  onClick={() => setSelectedGen(g.value as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedGen === g.value
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Branch Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase shrink-0">Branch:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full py-3 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
            >
              {branches.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-blue-600">{filteredMembers.length}</strong> of{' '}
            {members.length} family members
          </span>
          {(searchQuery || selectedGen !== 'all' || selectedBranch !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGen('all')
                setSelectedBranch('all')
              }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <FamilyMemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No family members found</h3>
          <p className="text-sm text-slate-500 mt-1">Try loosening your search terms or filters.</p>
        </div>
      )}
    </div>
  )
}
