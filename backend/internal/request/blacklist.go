package request

import (
	"sync"
)

type TokenBlacklist struct {
	innerMmap map[string]bool
	rwMutex   *sync.RWMutex
}

func NewTokenBlacklist() *TokenBlacklist {
	return &TokenBlacklist{
		innerMmap: make(map[string]bool),
		rwMutex:   &sync.RWMutex{},
	}
}

func (list *TokenBlacklist) AddToken(token string) {
	list.rwMutex.Lock()
	defer list.rwMutex.Unlock()
	list.innerMmap[token] = true
}

func (list *TokenBlacklist) CheckToken(token string) bool {
	list.rwMutex.RLock()
	defer list.rwMutex.RUnlock()
	return list.innerMmap[token]
}
