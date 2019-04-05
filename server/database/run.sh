# Run SQL Script
psql -h 35.228.19.40 -U postgres -d postgres -f ./database/scripts/${1}.sql