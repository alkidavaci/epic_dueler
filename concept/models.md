Account
    User:
    Email:
    Password:
    Character:

Character
    Name:
    CurrentHP:
    Gold:
    Wins:
    Inventory: Id
    StatBlock: Id
    npc:

Inventory
    Weapon: id
    Armor: id
    slot1: id
    slot2: id
    slot3: id
    slot4: id
    bag: [id]

StatBlock
    MaxHp:          H
    weaponRange:    
    Attack:         A
    Def:            D
    Crit:           C
    Parry:          P



Item
    Name:
    Icon:
    Itemtype:
    Price:
    Value: c.1,p.1
    Description:

queries:
    me: account > character > statblock
                            > inventory

    characters: list

    oppenent: account > character > statblock
                            > inventory

    shop: items

mutations
    login: (name, email)

    add account: (name, email, password)

    add character: (name) > generate inventory
                          > generate statblock

    update inventory: > set to item => update statblock
                        + pull from bag && push to bag
                        || add item
                        => +/- gold(optional)

    update character (wins deaths gold)


    remove character

    remove account

items

short sword: 'range.2'
long sword: 'range.4'
bastard sword: 'range.4'

    

        
