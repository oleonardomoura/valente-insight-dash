-- Criar política RLS para permitir leitura pública dos dados da pesquisa de satisfação
-- Como são dados de pesquisa que não contêm informações pessoais sensíveis,
-- permitiremos leitura pública para visualização na dashboard

CREATE POLICY "Permitir leitura pública dos dados da pesquisa" 
ON public."Pesquisa de Satisfação" 
FOR SELECT 
USING (true);

-- Opcional: Se quisermos permitir apenas leitura autenticada (mais seguro)
-- Descomente a linha abaixo e comente a política acima se preferir autenticação
-- USING (auth.uid() IS NOT NULL);